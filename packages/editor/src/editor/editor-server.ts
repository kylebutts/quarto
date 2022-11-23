/* eslint-disable @typescript-eslint/no-unused-vars */

/*
 * editor-server.ts
 *
 * Copyright (C) 2022 by Posit Software, PBC
 *
 * Unless you have received this program directly from Posit Software pursuant
 * to the terms of a commercial license agreement with Posit Software, then
 * this program is licensed to you under the terms of version 3 of the
 * GNU Affero General Public License. This program is distributed WITHOUT
 * ANY EXPRESS OR IMPLIED WARRANTY, INCLUDING THOSE OF NON-INFRINGEMENT,
 * MERCHANTABILITY OR FITNESS FOR A PARTICULAR PURPOSE. Please refer to the
 * AGPL (http://www.gnu.org/licenses/agpl-3.0.txt) for more details.
 *
 */

import { jsonRpcBrowserClient } from "core";

import {
  BibliographyResult,
  CrossrefMessage,
  CrossrefWork,
  DataCiteResult,
  DOIResult,
  EditorServer,
  kCrossrefWorks,
  kDataCiteSearch,
  kDoiFetchCsl,
  kEnvironmentGetRPackageCitations,
  kEnvironmentGetRPackageState,
  kPandocAddtoBibliography,
  kPandocAstToMarkdown,
  kPandocCitationHtml,
  kPandocGetBibliography,
  kPandocGetCapabilities,
  kPandocListExtensions,
  kPandocMarkdownToAst,
  kPubMedSearch,
  kXRefIndexForFile,
  kXRefQuartoIndexForFile,
  kXRefQuartoXRefForId,
  kXRefXRefForId,
  kZoteroBetterBibtexExport,
  kZoteroGetActiveCollectionSpecs,
  kZoteroGetCollections,
  kZoteroGetLibraryNames,
  kZoteroValidateWebApiKey,
  PandocAst,
  PandocCapabilitiesResult,
  PubMedResult,
  RPackageCitation,
  RPackageState,
  XRefs,
  ZoteroCollectionSpec,
  ZoteroResult,
} from "editor-types";


export function editorJsonRpcServer(url: string) : EditorServer {

  const request = jsonRpcBrowserClient(url);

  return {
    pandoc: {
      getCapabilities(): Promise<PandocCapabilitiesResult> {
        return request(kPandocGetCapabilities, []);
      },
      markdownToAst(params: {
        markdown: string,
        format: string,
        options: string[]
      }): Promise<PandocAst> {
        return request(kPandocMarkdownToAst, params);
      },
      astToMarkdown(params: {
        ast: PandocAst,
        format: string,
        options: string[]
      }): Promise<string> {
        return request(kPandocAstToMarkdown, params);
      },
      listExtensions(params: { format: string }): Promise<string> {
        return request(kPandocListExtensions, params);
      },
      getBibliography(params: {
        file: string | null,
        bibliography: string[],
        refBlock: string | null,
        etag: string | null
      }): Promise<BibliographyResult> {
        return request(kPandocGetBibliography, params);
      },
      addToBibliography(params: {
        bibliography: string,
        project: boolean,
        id: string,
        sourceAsJson: string,
        sourceAsBibTeX: string
      }): Promise<boolean> {
        return request(kPandocAddtoBibliography, params);
      },
      citationHTML(params: {
        file: string | null,
        sourceAsJson: string,
        csl: string | null
      }): Promise<string> {
        return request(kPandocCitationHtml, params);
      },
    },
    doi: {
      fetchCSL(doi: string, progressDelay: number): Promise<DOIResult> {
        return request(kDoiFetchCsl, [doi, progressDelay]);
      },
    },
    crossref: {
      works(query: string): Promise<CrossrefMessage<CrossrefWork>> {
        return request(kCrossrefWorks, [query]);
      },
    },
    datacite: {
      search(query: string): Promise<DataCiteResult> {
        return request(kDataCiteSearch, [query]);
      },
    },
    pubmed: {
      search(query: string): Promise<PubMedResult> {
        return request(kPubMedSearch, [query]);
      },
    },
    zotero: {
      validateWebAPIKey(key: string): Promise<boolean> {
        return request(kZoteroValidateWebApiKey, [key]);
      },

      getCollections(
        file: string | null,
        collections: string[],
        cached: ZoteroCollectionSpec[],
        useCache: boolean
      ): Promise<ZoteroResult> {
        return request(kZoteroGetCollections, [
          file,
          collections,
          cached,
          useCache,
        ]);
      },

      getLibraryNames(): Promise<ZoteroResult> {
        return request(kZoteroGetLibraryNames, []);
      },

      getActiveCollectionSpecs(
        file: string | null,
        collections: string[]
      ): Promise<ZoteroResult> {
        return request(kZoteroGetActiveCollectionSpecs, [file, collections]);
      },

      // Return status: nohost w/ warning text if it fails to
      // communciate w/ Better BibTeX. Otherwise returns
      // status: ok with exported text in message.
      betterBibtexExport(
        itemKeys: string[],
        translatorId: string,
        libraryId: number
      ): Promise<ZoteroResult> {
        return request(kZoteroBetterBibtexExport, [itemKeys, translatorId, libraryId]);
      },
    },
    xref: {
      indexForFile(file: string) : Promise<XRefs> {
        return request(kXRefIndexForFile, [file]);
      },
      xrefForId(file: string, id: string) : Promise<XRefs> {
        return request(kXRefXRefForId, [file,id]);
      },
      quartoIndexForFile(file: string) : Promise<XRefs> {
        return request(kXRefQuartoIndexForFile, [file]);
      },
      quartoXrefForId(file: string, id: string) : Promise<XRefs> {
        return request(kXRefQuartoXRefForId, [file, id]);
      }
    },
    environment: {
      getRPackageState() : Promise<RPackageState> {
        return request(kEnvironmentGetRPackageState, []);
      },
      getRPackageCitations(pkgName: string) : Promise<RPackageCitation[]> {
        return request(kEnvironmentGetRPackageCitations, [pkgName]);
      }
    }
  };
}
