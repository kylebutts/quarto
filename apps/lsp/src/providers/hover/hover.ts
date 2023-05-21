/*
 * hover.ts
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

import { Position, TextDocument } from "vscode-languageserver-textdocument";
import { Hover } from "vscode-languageserver";

import { yamlHover } from "./hover-yaml";
import { mathHover } from "./hover-math";
import { refHover } from "./hover-ref";
import { docEditorContext } from "../../quarto/quarto";
import { ConfigurationManager } from "../../config";


export function onHover(config: ConfigurationManager) {
  const onMathHover = mathHover(config);
  return async (
    doc: TextDocument,
    pos: Position
  ): Promise<Hover | null> => {
    return (
      (await refHover(doc, pos)) || onMathHover(doc, pos) || (await yamlHover(docEditorContext(doc, pos, true)))
    );
  } 
}
