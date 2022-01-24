class Menu {

    constructor(select, options = {}) {
      this.burger = document.querySelector(select)
  
      if (this.burger) {
        this.#setup(options)
      } else {
        console.error(`Menu: not element with select "${select}"`)
      }
    }
  
    #setup(options) {
      options.breakPoint = options.breakPoint || 767
      options.container = options.container || 'burger-menu'
      options.menu = options.menu || '#menu'
      options.onOpen = options.onOpen || eval
      options.onClose = options.onClose || eval
      options.onMenuFromContainer = options.onMenuFromContainer || eval
      options.onMenuToContainer = options.onMenuToContainer || eval
      if (options.containerClick === undefined) options.containerClick = true
      if (options.burgerClick === undefined) options.burgerClick = true
      this.options = options
  
      this.#createMenu()
  
  
      this.BurgerClickHandler = BurgerClickHandler.bind(this)
      this.ContainerClickHandler = ContainerClickHandler.bind(this)
      this.WindowResizeHandler = WindowResizeHandler.bind(this)
      this.WindowLoadHandler = WindowLoadHandler.bind(this)
  
      this.burger.addEventListener('click', this.BurgerClickHandler)
      this.container.addEventListener('click', this.ContainerClickHandler)
      window.addEventListener('resize', this.WindowResizeHandler)
      window.addEventListener('load', this.WindowLoadHandler)
    }
  
    #createMenu() {
      const container = document.createElement('div')
      container.classList.add(this.options.container)
  
      this.menu = document.querySelector(this.options.menu)
      if (!this.menu) {
        console.error(`Menu: not element with select "${this.options.menu}"`)
        return
      }
      this.parantMenu = this.menu.parentElement
  
      document.body.prepend(container)
      this.container = container
    }
  
    moveMenuToContainer() {
      this.container.append(this.menu)
      this.isMenu = true
      this.options.onMenuToContainer()
    }
  
    moveMenuFromContainer() {
      this.close()
      this.parantMenu.append(this.menu)
      this.isMenu = false
      this.options.onMenuFromContainer()
    }
  
    open() {
      if (window.innerWidth <= this.options.breakPoint) {
        this.burger.classList.add('active')
        document.body.classList.add('no-overflow')
  
        this.container.style.display = "block"
        setTimeout(() => this.container.classList.add('active'), 0)
  
        this.options.onOpen()
      } 
    }
  
    close() {
      this.burger.classList.remove('active')
      document.body.classList.remove('no-overflow')
  
      this.container.classList.remove('active')
      setTimeout(() => this.container.style.display = "none", 300)
  
      this.options.onClose()
    }
  
    destroy() {
      this.moveMenuFromContainer()
      this.container.replaceWith('')
      this.burger.removeEventListener('click', this.BurgerClickHandler)
      this.container.removeEventListener('click', this.ContainerClickHandler)
      window.removeEventListener('resize', this.WindowResizeHandler)
      window.removeEventListener('load', this.WindowLoadHandler)
      delete window.this
    }
  
    get containerClick() {
      return this.options.containerClick
    }
  
    set containerClick(flag) {
      this.options.containerClick = flag
    }
  
    get burgerClick() {
      return this.options.burgerClick
    }
  
    set burgerClick(flag) {
      this.options.burgerClick = flag
    }
    
  }
  
  function BurgerClickHandler(e) {
    if (!this.options.burgerClick) return
    this.burger.classList.contains('active') ? this.close() : this.open()
  }
  
  function WindowResizeHandler(e) {
    if (window.innerWidth > this.options.breakPoint) {
      this.isMenu ? this.moveMenuFromContainer() : null
    } else {
      !this.isMenu ? this.moveMenuToContainer() : null
    }
  }
  
  function WindowLoadHandler(e) {
    window.innerWidth > this.options.breakPoint ? this.moveMenuFromContainer() : this.moveMenuToContainer()
  }
  
  function ContainerClickHandler(e) {
    if (!this.options.containerClick) return
    e.target === this.container ? this.close() : null
  }