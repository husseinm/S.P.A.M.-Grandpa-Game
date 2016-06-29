var speed : float;
var rotateIncrement : float;
protected var paused = false;
private var upCycle = false;
private var originalHeight = 0;
private var maxY : Vector3;
private var highPoint = 0.0f;
private var lowPoint = 0.0f;
private var rotationAngle = 0.0f;

function OnPauseGame() {
	paused = true;
}

function OnResumeGame() {
	paused = false;
}

function Update () {
	if (originalHeight != Screen.height) {
		maxY = Camera.main.ScreenToWorldPoint(new Vector3(0, Screen.height, 0));

		highPoint = maxY.y - 2;
		lowPoint = -maxY.y + 2;
	}

	if (!paused) {
		var v3 = transform.position;
		v3.x -= Time.deltaTime * speed;

    if (upCycle) {
      v3.y += Time.deltaTime * speed;

      if (v3.y >= highPoint) {
        upCycle = false;
      }
    } else {
      v3.y -= Time.deltaTime * speed;

      if (v3.y <= lowPoint) {
        upCycle = true;
      }
    }

    rotationAngle += rotateIncrement;

    var target = Quaternion.Euler(0.0, 0.0, rotationAngle);	
		transform.position = v3;
    transform.rotation = Quaternion.Slerp(transform.rotation, target, Time.deltaTime * 2);
	}
}
