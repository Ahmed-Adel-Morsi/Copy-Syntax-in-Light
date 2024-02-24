const vscode = require("vscode");

/**
 * @param {vscode.ExtensionContext} context
 */

function activate(context) {
  let disposable = vscode.commands.registerCommand(
    "copy-syntax-in-light.copySyntaxInLight",
    async function () {
      try {
        // Get the current configuration
        const config = vscode.workspace.getConfiguration();

        // Get the current color theme
        const currentTheme = config.get("workbench.colorTheme");

        // Set the color theme to "Default Light+"
        await config.update(
          "workbench.colorTheme",
          "Default Light Modern",
          vscode.ConfigurationTarget.Global
        );

        // Copy Selected Text
        await vscode.commands.executeCommand(
          "editor.action.clipboardCopyAction"
        );

        // Show success message
        vscode.window.showInformationMessage("Text copied in Light Mode");

        // Switch back to dark theme
        await config.update(
          "workbench.colorTheme",
          currentTheme,
          vscode.ConfigurationTarget.Global
        );
      } catch (error) {
        vscode.window.showErrorMessage(`Error: ${error}`);
      }
    }
  );

  context.subscriptions.push(disposable);
}

// This method is called when your extension is deactivated
function deactivate() {}

module.exports = {
  activate,
  deactivate,
};
