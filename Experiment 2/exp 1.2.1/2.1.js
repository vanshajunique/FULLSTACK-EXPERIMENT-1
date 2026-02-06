const messageInput = document.getElementById('messageInput');
const currentCount = document.getElementById('currentCount');
const progressFill = document.getElementById('progressFill');
const warningMessage = document.getElementById('warningMessage');

const MAX_CHARACTERS = 150;
const WARNING_THRESHOLD = 120;
const DANGER_THRESHOLD = 140;

messageInput.addEventListener('input', function() {
    const currentLength = this.value.length;
    
    updateCounter(currentLength);
    updateProgressBar(currentLength);
    updateWarning(currentLength);
});

function updateCounter(length) {
    currentCount.textContent = length;
    
    if (length > DANGER_THRESHOLD) {
        currentCount.style.color = '#dc3545';
    } else if (length > WARNING_THRESHOLD) {
        currentCount.style.color = '#f5af19';
    } else {
        currentCount.style.color = '#667eea';
    }
}

function updateProgressBar(length) {
    const percentage = (length / MAX_CHARACTERS) * 100;
    progressFill.style.width = percentage + '%';
    
    if (length > DANGER_THRESHOLD) {
        progressFill.classList.add('warning');
    } else {
        progressFill.classList.remove('warning');
    }
}

function updateWarning(length) {
    const remaining = MAX_CHARACTERS - length;
    
    if (length > DANGER_THRESHOLD) {
        warningMessage.classList.add('active', 'danger');
        warningMessage.textContent = `⚠️ Only ${remaining} character${remaining !== 1 ? 's' : ''} remaining!`;
    } else if (length > WARNING_THRESHOLD) {
        warningMessage.classList.add('active');
        warningMessage.classList.remove('danger');
        warningMessage.textContent = `⏱️ Getting close! ${remaining} character${remaining !== 1 ? 's' : ''} left`;
    } else {
        warningMessage.classList.remove('active', 'danger');
        warningMessage.textContent = '';
    }
}
