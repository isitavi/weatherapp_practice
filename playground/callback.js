var usrData = (id,callback) => {
    var user = {
        id: id,
        name: 'Alex'
    }

    setTimeout(() => {
        callback(user);
    }, 3000);

};

usrData(31,(userobject) => {
    console.log(userobject);
});