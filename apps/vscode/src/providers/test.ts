/*
 * test.ts
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

//
// Do not ship this. It's a test for Isabel.
//

import { Command } from "../core/command";
import { QuartoContext } from "quarto-core";
import { ExtensionHost } from "../host";

export function testCommands(host: ExtensionHost, quartoContext: QuartoContext): Command[] {
  return [
    new TestCommand(quartoContext)
  ];
}

class TestCommand implements Command {
  private static readonly id = "quarto.test";
  public readonly id = TestCommand.id;

  constructor(
    private readonly quartoContext_: QuartoContext
  ) { }

  async execute(): Promise<void> {
    console.log("quarto.test command executed");
  }
}
