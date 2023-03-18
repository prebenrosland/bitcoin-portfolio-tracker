const { createHmac } = await import('node:crypto');

function CreateHash(input){
    let hash = createHmac('sha256', input).digest('hex');
    return hash;
}

export default CreateHash;