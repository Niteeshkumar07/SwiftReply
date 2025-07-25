console.log("Email Writer");

function getEmailContent(){
    const selectors = [
        '.h7',
        '.a3s.aiL',
        '.gmail_quote',
        '[role="presentation"]'
    ];
    for( const selector of selectors ) {
        const content = document.querySelector(selector);
        if (content){
            return content.innerText.trim();
        }
        
        return '';
    }
}
function findComposeToolbar(){
    const selectors = ['.btC', '.aDh',  '[role="toolbar"]', '.gU.Up'];
    for( const selector of selectors ) {
        const toolbar = document.querySelector(selector);
        if (toolbar){
            return toolbar;
        }
        
        return null;
    }
}

function createAIButton() {
    const button = document.createElement('div');

    button.className = 'T-I J-J5-Ji aoO v7 T-I-atl L3 ai-reply-button';

    // Dark Gemini-style button
    button.style.marginRight = '8px';
    button.style.backgroundColor = '#0b57d0'; // Deep dark navy
    button.style.color = '#ffffff';
    button.style.fontWeight = '800';
    button.style.fontSize = '16px';
    button.style.letterSpacing = '0.5px';
    button.style.padding = '8px 20px';
    button.style.borderRadius = '22px';
    button.style.cursor = 'pointer';
    button.style.display = 'flex';
    button.style.alignItems = 'center';
    button.style.justifyContent = 'center';
    button.style.gap = '8px';
    button.style.boxShadow = '0 2px 5px #0b57d0)';
    button.style.transition = 'all 0.25s ease';

    button.innerHTML = `<span style="font-size: 16px;">AI Reply</span>`;

    button.setAttribute('role', 'button');
    button.setAttribute('data-tooltip', 'Generate AI Reply');

    // Hover and click styles
    button.addEventListener('mouseenter', () => {
        button.style.backgroundColor = '#0b57d0';
    });
    button.addEventListener('mouseleave', () => {
        button.style.backgroundColor = '#0b57d0';
    });
    button.addEventListener('mousedown', () => {
        button.style.boxShadow = 'inset 0 2px 4px #0b57d0)';
    });
    button.addEventListener('mouseup', () => {
        button.style.boxShadow = '0 2px 5px #0b57d0)';
    });

    return button;
}


function injectButton(){
    const existingButton = document.querySelector('.ai-reply-button');
    if (existingButton) {
        existingButton.remove();
    }

    const toolbar = findComposeToolbar();
    if (!toolbar) {
        console.log("Toolbar not found");
        return;
        
    }

    console.log("Toolbar found");
    const button = createAIButton();
    button.classList.add('ai-reply-button');

    button.addEventListener('click', async () => {
        try{
            button.innerHTML = 'Generating...';
            button.disabled = true;
            const emailContent = getEmailContent();
            
            const response = await fetch('http://localhost:8080/api/email/generate',{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body : JSON.stringify({
                    emailContent : emailContent,
                    tone: "professional"
                })
            });

            if (!response.ok) {
                throw new Error("API Request Failed");
            }

            const generatedReply = await response.text();

            const composeBox = document.querySelector(
                '[role="textbox"][g_editable="true"]'
            );

            if (composeBox) {
                composeBox.focus();
                document.execCommand('insertText', false, generatedReply);
            }

        } catch (error){

        } finally{
            button.innerHTML = "AI Reply";
            button.disabled = false;
        }
    });

    toolbar.insertBefore(button, toolbar.firstChild);
    
}

const observer = new MutationObserver((mutations) => {
    for (const mutation of mutations) {
        const addedNodes = Array.from(mutation.addedNodes);

        const hasComposeElements = addedNodes.some(node => 
            node.nodeType === Node.ELEMENT_NODE && 
            (node.matches('.aDh, .btC, [role="dialog"]')
        || node.querySelector('.aDh, .btC, [role="dialog"]'))
);

        if (hasComposeElements) {
            console.log("Compose Window Detected.");
            setTimeout(injectButton, 500);
        }
    }
});

observer.observe(document.body, {
    childList: true,
    subtree: true,
});
