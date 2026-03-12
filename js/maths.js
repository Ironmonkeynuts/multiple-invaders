function isFactor(bombValue, targetNumber) {
    if (bombValue === 0) {
        return false;
    }

    return targetNumber % bombValue === 0;
}

function isPrime(number) {
    if (number < 2) {
        return false;
    }

    for (let i = 2; i <= Math.sqrt(number); i += 1) {
        if (number % i === 0) {
            return false;
        }
    }

    return true;
}

function isPrimeFactor(bombValue, targetNumber) {
    return isPrime(bombValue) && isFactor(bombValue, targetNumber);
}

function calculateDamage(bombValue, targetNumber) {
    if (!isFactor(bombValue, targetNumber)) {
        return 0;
    }

    if (isPrimeFactor(bombValue, targetNumber)) {
        return 2;
    }

    return 1;
}