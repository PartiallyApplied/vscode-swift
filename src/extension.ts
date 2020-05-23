// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/.

import * as vscode from "vscode";
import { LanguageClient } from "vscode-languageclient";
import * as which from "which";

export function activate(context: vscode.ExtensionContext) {
	let outputChannel = vscode.window.createOutputChannel("Swift");
	context.subscriptions.push(outputChannel);
	outputChannel.appendLine("Swift activated");

	let lspPath = which.sync("sourcekit-lsp", { nothrow: true });
	if (lspPath === null) {
		outputChannel.appendLine(
			"sourcekit-lsp not found in $PATH, checking for Xcode"
		);
		lspPath = which.sync("sourcekit-lsp", {
			nothrow: true,
			path:
				"/Applications/Xcode.app/Contents/Developer/Toolchains/XcodeDefault.xctoolchain/usr/bin",
		});
		if (lspPath === null) {
			outputChannel.appendLine(
				"sourcekit-lsp not found in Xcode.app, giving up"
			);
		}
	}
	if (lspPath !== null) {
		outputChannel.appendLine(
			`Found language server at "${lspPath}", launching now...`
		);
		const languageClient = new LanguageClient(
			"sourcekit-lsp",
			"Swift Language Server",
			{ command: lspPath },
			{ documentSelector: ["swift"] }
		);
		context.subscriptions.push(languageClient.start());
	}
}

export function deactivate() {}
