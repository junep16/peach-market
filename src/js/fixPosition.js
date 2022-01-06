function fixedFunc(contentClass, fixedClass, isTop=true) {
  const contentInfoHeight = contentClass.getBoundingClientRect().bottom;

  document.addEventListener("scroll", () => {
    if (isTop) {
      if (window.scrollY > contentInfoHeight) {
        contentClass.classList.add(fixedClass);
      } else {
        contentClass.classList.remove(fixedClass);
      }
    } else {
      if (window.scrollY < contentInfoHeight) {
        contentClass.classList.add(fixedClass);
      } else {
        contentClass.classList.remove(fixedClass);
      }
    }
  });
}
