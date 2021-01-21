 let themeDots = document.getElementsByClassName('theme-dot')

for (var i=0; themeDots.length > i; i++){
  themeDots[i].addEventListener('click', function(){
    let mode = this.dataset.mode
    console.log('Option clicked', mode)
    setTheme(mode)
  })
}

function setTheme(mode){
  if(mode == 'dark'){
    document.getElementById('theme-style').href = 'dark.css'
  }
  if(mode == 'light'){
    document.getElementById('theme-style').href = 'light.css'
  }
  if(mode == 'ninefive'){
    document.getElementById('theme-style').href = 'win-nine-five.css'
  }
  if(mode == 'hackerman'){
    document.getElementById('theme-style').href = 'hackerman.css'
  }
}