var submit = document.getElementById('submit');

submit.addEventListener('click', function (e) {
    e.preventDefault();

    var data = {
        name: null,
        img: null,
        answers: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    };

    var options = document.getElementsByClassName('chosen-select');
    data.name = document.getElementById('name').value;
    data.img = document.getElementById('photo').value;
    if (!data.name || !data.img) {
        alert('All fields must be filled out');
        return;
    }


    for (i = 0; i < options.length; i++) {
        if (!options[i].value){
            alert('Please complete the survey.');
            return;
        }
        data.answers[i] = Number(options[i].value);
    }

    fetch('../api/friends', {
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'post',
        body: JSON.stringify(data)
    }).then(res => res.json()).then(match => {
        console.log(match);
        showModal(`<h4>${match.name}</h4><br><img src='${match.img}'></img>`);
    });
});

function showModal(content) {

    let modal = $('#results-modal');
    modal.css('text-align', 'center');

    modal.modal('show');
    $('#modal-text').html(content);

}