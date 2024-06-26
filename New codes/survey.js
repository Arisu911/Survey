class magicFocus
  
constructor: (@parent) ->
  
  return unless @parent
      
  @focus = document.createElement 'div'
  @focus.classList.add 'magic-focus'
  @parent.classList.add 'has-magic-focus'
  @parent.appendChild @focus

  for input in @parent.querySelectorAll('input, textarea, select')      
    input.addEventListener 'focus', ->
      window.magicFocus.show()
    input.addEventListener 'blur', ->
      window.magicFocus.hide()
  
show: =>
  
  return unless ['INPUT','SELECT','TEXTAREA'].includes? (el = document.activeElement).nodeName
  
  clearTimeout(@reset)
                 
  el = document.querySelector("[for=#{el.id}]") if ['checkbox', 'radio'].includes? el.type

  @focus.style.top = "#{el.offsetTop||0}px"
  @focus.style.left = "#{el.offsetLeft||0}px"
  @focus.style.width = "#{el.offsetWidth||0}px"
  @focus.style.height = "#{el.offsetHeight||0}px"
    
hide: =>
     
  @focus.style.width = 0 unless ['INPUT','SELECT','TEXTAREA', 'LABEL'].includes? (el = document.activeElement).nodeName
      
  @reset = setTimeout ->
    window.magicFocus.focus.removeAttribute('style')
  , 200

# initialize
  
window.magicFocus = new magicFocus document.querySelector('.form')

$ ->
$('.select').customSelect()