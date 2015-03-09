#pragma strict

private var currentFrame = 0;
private enum Direction {up, down, left, right, off};
private var timerdir = Direction.left;
function Start () {

}

function Update () {
	GetComponent(aniSprite).aniSprite(1,8,0,0,8,2,false);
	currentFrame = GetComponent(aniSprite).getFrame();
	
	if(currentFrame == 0)
		timerdir = Direction.left;
	else if(currentFrame == 2)
		timerdir = Direction.up;
	else if(currentFrame == 4)
		timerdir = Direction.right;
	else if(currentFrame == 6)
		timerdir = Direction.down;
	else
		timerdir = Direction.off;
}

function getTimerDir()
{
	return timerdir;
}