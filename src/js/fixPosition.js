function fixedFunc(contentClass, fixedClass, isTop=true) {
  const contentInfoHeight = contentClass.getBoundingClientRect();

  document.addEventListener("scroll", () => {
    if (isTop) {
      if (window.scrollY > contentInfoHeight.bottom) {
        contentClass.classList.add(fixedClass);
      } else {
        contentClass.classList.remove(fixedClass);
      }
    } else {
      if (window.scrollY > contentInfoHeight.bottom) {
        contentClass.classList.add(fixedClass);
      } else {
        contentClass.classList.remove(fixedClass);
      }
    }
  });
}
