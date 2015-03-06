#pragma strict

function Start () {

}

function Update () {
	GetComponent(aniSprite).aniSprite(1,8,0,0,8,2,false);
	
	transform.position.y = Camera.main.orthographicSize;
	transform.position.x = Camera.main.orthographicSize * Camera.main.aspect;
}