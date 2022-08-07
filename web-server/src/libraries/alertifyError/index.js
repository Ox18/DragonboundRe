export class AlertifyError{

    static errorsToHTML(errors){
        const list = errors.map(err => `<li>${err}</li>`);
        return `<ul class='errorlist'>${list.join("")}</ul>`;        
    }
}