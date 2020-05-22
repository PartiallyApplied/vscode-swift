// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

import * as vscode from "vscode";
import { LanguageClient } from "vscode-languageclient";

export function activate(context: vscode.ExtensionContext) {
	let outputChannel = vscode.window.createOutputChannel("Swift");
	context.subscriptions.push(outputChannel);
	outputChannel.appendLine("Swift activated");

	const languageClient = new LanguageClient(
		"sourcekit-lsp",
		"Swift Language Server",
		{ command: "sourcekit-lsp" },
		{ documentSelector: ["swift"] }
	);
	context.subscriptions.push(languageClient.start());
}

export function deactivate() {}
