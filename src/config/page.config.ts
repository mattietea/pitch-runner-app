export const INTRO_SAYS = {
  title: 'Welcome to Pitch Runner.',
  dirs: `Before you get started there are a couple things
  you should know. Every time you visit a page, we'll tell you
  which page you're on. The first time you visit a page 
  we'll read you the page instructions. Anytime after that,
  if you need to hear the instructions again, just double tap
  the screen!`
};

export const HOME_SAYS = {
  title: `You're on the home page.`,
  dirs: 'Swipe up for a tutorial,' +
  'Swipe right for your high score,' +
  'Swipe Left for settings' +
  'and swipe down to start playing.'
};

export const SETTINGS_SAYS = {
  title: `You're on the settings page.`,
  dirs: 'Swipe up to make us talk faster,' +
  'Swipe down to make us talk slower and ' +
  'Swipe right to go back to the home page'
};

export const LOST_SAYS = {
  title: `You're on the lost page.`,
  dirs: ' Swipe up to go to the home page,' +
  'Swipe right to hear your score again' +
  'Swipe down to play again '
};

export const SCORES_SAYS = {
  title: `You're on the high score page.`,
  dirs: 'Swipe left to go back to the home page, ' +
  'Swipe down to hear your high score again'
};

export const TUTORIAL_SAYS = {
  intro: `Welcome to the tutorial. Pitch runner is an endless 
  running game. Based on the sounds you hear, swipe away 
  from oncoming objects! Sounds can be in your left ear,  right ear,  or both ears.`,
  stepOne: `Here are some examples of sounds coming from the right, when 
  you hear these sounds you'll want to dive away from them by swiping left`,
  stepTwo: `Here are some examples of sounds coming from the left, when 
  you hear these sounds you'll want to dive away from them by swiping right`,
  stepThree: `Sometimes you'll hear sounds in both ears. When this happens, you'll
   want to jump over them by swiping up. Here are some examples`,
  stepFour: `Lastly, there is a bonus sound. When you hear the bonus sound
  you want to pick it up by swiping down. This will give you extra points!
  The bonus sound sounds like this.`,
  finished: `Congrats, you've finished the tutorial! If you want to start playing,
  swipe up. If you want to hear the tutorial again, swipe right. 
  If you want to go back to the home screen, swipe down`,
  dirs: 'Swipe up to start playing, swipe right to hear the tutorial again,' +
  ' and swipe down to go to the home page'
};


export const UNRECOGNIZED_SWIPE = `Oops! That doesn't go anywhere.
remember you can double tap to hear the instructions again!`;
