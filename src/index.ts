import { createMacro, MacroError } from "babel-plugin-macros"
import { render } from "pug"

/** Pug to Html */
function pug2html({ references }) {
  references.default.forEach(({ parentPath }) => {
    if (parentPath.type === "TaggedTemplateExpression") {
      const pug = parentPath.get("quasi").evaluate().value
      const html = render(pug.trim())
      const source = `"${html.replaceAll('"', '\\"')}"`
      parentPath.replaceWithSourceString(source)
    } else {
      throw new MacroError("Where is the pug?")
    }
  })
}

export default createMacro(pug2html)
