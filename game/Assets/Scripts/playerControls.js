
var velocity : Vector3 = Vector3.zero;
var gravity : float = 5.0;
var moveRight = true;
var jumpSound : AudioClip;
var dieSound : AudioClip;
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

function Update()
{
	var aniPlay = GetComponent("aniSprite");
	var controller : CharacterController = 
	GetComponent(CharacterController);
	
	if (controller.isGrounded)
	{
		
		velocity = Vector3(Input.GetAxis("Horizontal") * 3,0,0);
		if (velocity.x > 0)
		{
			moveRight = true;
		}
		else if (velocity.x < 0)
		{
			moveRight = false;
		}
		
		if (Input.GetKey("space"))
		{
			PlaySound(jumpSound,0);
			velocity.y = 12;
			if (moveRight)
			{
				aniPlay.aniSprite(3,9,0,2,3,8,false);   //jump face right
			}
			else
			{
				aniPlay.aniSprite(3,9,0,2,3,8,true);   //jump face left
			}
		}		
		else
		{
			if (Input.GetKey("right"))
			{
				aniPlay.aniSprite(3,9,0,1,3,8,false);   //walk face right
			}
			else if (Input.GetKey("left"))
			{
				aniPlay.aniSprite(3,9,0,1,3,8,true);   //walk face left
			}
			else if (Input.GetKey("down"))
			{
				if (moveRight)
				{
					aniPlay.aniSprite(3,9,0,6,3,24,false);   //crouch face right		
				}	
				else
				{
					aniPlay.aniSprite(3,9,0,6,3,24,false);   //crouch face left	
				}
			}		
			else
			{
				if (moveRight)
				{
					aniPlay.aniSprite(3,9,0,0,3,8,false);   //neutral face right		
				}
				else
				{
					aniPlay.aniSprite(3,9,0,0,3,8,true);   //neutral face left	
				}	
			}
		 }
	}

	velocity.y -= gravity * Time.deltaTime;
	controller.Move(velocity * Time.deltaTime);
}

function resetGame()
{
	PlaySound(dieSound,0);
	yield WaitForSeconds (audio.clip.length);
	Application.LoadLevel('splash');
}