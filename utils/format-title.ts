/**
 * Formats a file name by removing the extension and converting underscores/dashes to spaces.
 * @param fileName - The original file name (e.g. "my_file-name.txt")
 * @returns A formatted title (e.g. "My File Name")
 */
export function formatFileNameAsFileTitle(fileName: string): string {
    // Use regex to remove the file extension
    const nameWithoutExtension = fileName.replace(/\.[^/.]+$/, '');
  
    // Replace underscores and dashes with spaces
    const nameWithSpaces = nameWithoutExtension.replace(/[_-]+/g, ' ');
  
    // Capitalize each word
    const formattedTitle = nameWithSpaces.replace(/\b\w/g, (char) =>
      char.toUpperCase(),
    );
  
    return formattedTitle;
  }
  