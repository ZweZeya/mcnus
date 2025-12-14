import { BIRD_HEIGHT, BIRD_WIDTH } from "./Bird";
import { BACKGROUND_HEIGHT } from "./FlappyBird";
import { Position } from "./Gravity";
import { GAP_WIDTH, OBSTACLE_WIDTH, ObstacleParams } from "./Obstacle";

export function checkCollision(bird : Position, obstacle : ObstacleParams) : boolean {
    const birdLeft = bird.x
    const birdRight = bird.x + BIRD_WIDTH;
    const birdTop = bird.y + BIRD_HEIGHT;
    const birdBottom = bird.y;

    const pipeLeft = obstacle.x;
    const pipeRight = obstacle.x + OBSTACLE_WIDTH;
    const pipeTop = BACKGROUND_HEIGHT * obstacle.gapHeight;
    const pipeBottom = BACKGROUND_HEIGHT - GAP_WIDTH - pipeTop;

    const pipeTopEdge = BACKGROUND_HEIGHT - pipeTop;
    const pipeBottomEdge = pipeBottom;
    
    if (birdRight >= pipeLeft && birdLeft <= pipeRight) {
        if (birdBottom <= pipeBottomEdge || birdTop >= pipeTopEdge) {
            return true;
        }
    }

    if (birdBottom <= 0 || birdTop >= BACKGROUND_HEIGHT) {
        return true;
    }

    return false;
}