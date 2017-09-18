"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function getFileContent(tree, path) {
    const fileEntry = tree.get(path);
    if (!fileEntry) {
        throw new Error(`The file (${path}) does not exist.`);
    }
    return fileEntry.content.toString();
}
exports.getFileContent = getFileContent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2V0LWZpbGUtY29udGVudC5qcyIsInNvdXJjZVJvb3QiOiIvVXNlcnMvcmljYXJkb192YXJhbmRhL1Byb2plY3RzL2RldmtpdC8iLCJzb3VyY2VzIjpbInBhY2thZ2VzL3NjaGVtYXRpY3MvYW5ndWxhci91dGlsaXR5L3Rlc3QvZ2V0LWZpbGUtY29udGVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQVVBLHdCQUErQixJQUFVLEVBQUUsSUFBWTtJQUNyRCxNQUFNLFNBQVMsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDO0lBRWpDLEVBQUUsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQztRQUNmLE1BQU0sSUFBSSxLQUFLLENBQUMsYUFBYSxJQUFJLG1CQUFtQixDQUFDLENBQUM7SUFDeEQsQ0FBQztJQUVELE1BQU0sQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDLFFBQVEsRUFBRSxDQUFDO0FBQ3RDLENBQUM7QUFSRCx3Q0FRQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cbmltcG9ydCB7IFRyZWUgfSBmcm9tICdAYW5ndWxhci1kZXZraXQvc2NoZW1hdGljcyc7XG5cblxuZXhwb3J0IGZ1bmN0aW9uIGdldEZpbGVDb250ZW50KHRyZWU6IFRyZWUsIHBhdGg6IHN0cmluZyk6IHN0cmluZyB7XG4gIGNvbnN0IGZpbGVFbnRyeSA9IHRyZWUuZ2V0KHBhdGgpO1xuXG4gIGlmICghZmlsZUVudHJ5KSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKGBUaGUgZmlsZSAoJHtwYXRofSkgZG9lcyBub3QgZXhpc3QuYCk7XG4gIH1cblxuICByZXR1cm4gZmlsZUVudHJ5LmNvbnRlbnQudG9TdHJpbmcoKTtcbn1cbiJdfQ==