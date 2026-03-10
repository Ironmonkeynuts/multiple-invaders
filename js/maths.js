function isFactor(bomb, target) {
    if (bomb === 0) {
        return false;
    }
    return target % bomb === 0;
}

function isPrime(num) {
    if (num < 2) {
        return false;
    }

    for (let i = 2; i <= Math.sqrt(num); i += 1) {
        if (num % i === 0) {
            return false;
        }
    }

    return true;
}

function isPrimeFactor(bomb, target) {
    return isPrime(bomb) && isFactor(bomb, target);
}

function calculateDamage(bomb, target) {
    if (!isFactor(bomb, target)) {
        return 0;
    }

    if (isPrimeFactor(bomb, target)) {
        return 2;
    }

    return 1;
}