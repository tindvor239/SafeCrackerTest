/**
 *  Define all constants variable in game
 * Author : Thomas Tran
 * email: thomas.tran@mfortune.co.uk
 * git: https://github.com/OnePassio/mini_html5_game.git
 */

export const SCENE_MAIN_MENU='mainmenu'; // scene main menu
export const SCENE_MAIN_GAME='maingame'; // scene main game
export const SCENE_BOOT='boot'; // scene boot from beginning
export const SCENE_PRELOADER='preloader'; // scene to preload resources

// position of each element on screen main game
export const POSITION_SAFE_BOX = {x:58,y:180}; // position of safebox from left panel
export const DISTANCE_EACH_SAFE_BOX = {x:167,y:140}; // distance each safeboxes

export const POSITION_TEXT_SAFEBOX_RESULT_INFO = {x:626,y:190}; // location of text reward info on right panel
export const DISTANCE_TEXT_SAFEBOX_RESULT_INFO=63;  // distance betwwen 4 text reward info on right panel

export const POSITION_LEFT_LED = {x:593,y:270};  // left led effect on right panel
export const POSITION_RIGHT_LED = {x:750,y:270}; // right led effect on right panel

export const POSITION_ROULETTE = {x:585,y:283}; // postion of rouletee on right panel
export const POSITION_SPIN_BUTTION = {x:697,y:425}; // position of spin button(text) on right panel
export const POSITION_TEXT_SPIN_RESULT_INFO = {x:576,y:181}; // postion of text spin result on right panel

export const POSITION_BUTTON_PLAY_AGAIN = {x:350,y:621}; // postion of button play again

export const POSITION_TEXT_GUIDE_LINE = {x:60,y:32}; // position of text guide line on top panel

export const POSITION_TEXT_INFO_MESSAGE = {x:60,y:20};// position of text message on top panel

// const variable for roulette
export const MAX_ROTATE_ANGLE = 1000000*360; // max number of angle
export const NUMBER_WHELL_ROUND_EACH_SPIN = 8; // number of rotation round each spin turn
export const TIME_ROTATION_EACH_SPIN = 3000; // time of rotation each spin turn (by milisecond)