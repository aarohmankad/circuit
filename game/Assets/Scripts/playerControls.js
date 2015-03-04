
var velocity : Vector3 = Vector3.zero;
var gravity : float = 20.0;
var moveRight = true;
var running = false;
var movingTime : float;
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
		
		velocity = Vector3(Input.GetAxis("Horizontal"),0,0);
		if (velocity.x > 0)
		{
			moveRight = true;
			movingTime += Time.deltaTime;
			if (movingTime > 1.0)
				running = true;
			else
				running = false;
		}
		else if (velocity.x < 0)
		{
			movingTime += Time.deltaTime;
			moveRight = false;
			if (movingTime > 1.0)
				running = true;
			else
				running = false;			
		}
		else
		{
			movingTime = 0;
		}
		
		if (Input.GetKey("space"))
		{
			PlaySound(jumpSound,0);
			velocity.y = 8;
			if (moveRight)
			{
				aniPlay.aniSprite(16,16,11,2,4,12,false);   //jump face right
			}
			else
			{
				aniPlay.aniSprite(16,16,11,3,4,12,false);   //jump face left
			}
		}		
		else
		{
			if (Input.GetKey("right"))
			{
				if (running)
				{
					aniPlay.aniSprite(16,16,0,6,16,12,false);   //run face right		
				}
				else
				{
					aniPlay.aniSprite(16,16,0,2,10,12,false);   //walk face right		
				}
			}
			else if (Input.GetKey("left"))
			{
				if (running)
				{
					aniPlay.aniSprite(16,16,0,7,16,12,false);   //run face left		
				}
				else
				{
					aniPlay.aniSprite(16,16,0,3,10,12,false);   //walk face left		
				}	
					
			}
			else if (Input.GetKey("down"))
			{
				if (moveRight)
				{
					aniPlay.aniSprite(16,16,0,8,16,12,false);   //crouch face right		
				}	
				else
				{
					aniPlay.aniSprite(16,16,0,9,16,12,false);   //crouch face left	
				}
			}		
			else
			{
				if (moveRight)
				{
					aniPlay.aniSprite(16,16,0,0,16,12,false);   //neutral face right		
				}
				else
				{
					aniPlay.aniSprite(16,16,0,1,16,12,false);   //neutral face left	
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