#pragma strict
var startPoint : Transform;
var saveBox : Transform;
var curSavePos : Vector3;
var killSound : AudioClip;

var soundRate : float = 0.0;
var soundDelay : float = 0.0;
function PlaySound(soundName,soundDelay : float)
{
	if (!audio.isPlaying && Time.time > soundRate)
	{
		soundRate = Time.time + soundDelay;
		audio.clip = soundName;
		audio.Play();
	}
}

function Start () {
	if (startPoint != null)
	{
		transform.position = startPoint.position;	
		curSavePos = startPoint.position;
	}
}
function Update () {
}
function OnTriggerEnter(other : Collider)
{
	if (other.tag == "killBox")
	{
		PlaySound(killSound,0);
		transform.position = curSavePos;
	}
	
	if (saveBox != null && other.tag == "ReSpawn")
	{
		curSavePos = saveBox.position;		
	}	
}