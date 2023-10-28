export default function getTitleNavbar(menu, location) {
  for (let i = 0; i < menu.length; i++) {
    const element = menu[i];
    if (location.pathname === "/" + element.path) {
      return element.name;
    } else {
      const children = menu[i].children;
      if (children) {
        for (let i = 0; i < children.length; i++) {
          const element = children[i];
          if (location.pathname === element.pathname) {
            return element.name;
          }
        }
      }
    }
  }
}
