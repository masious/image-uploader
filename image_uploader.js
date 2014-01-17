/*
	image_uploader API
	Made by Masious https://github.com/masious
	For more information visit: https://github.com/masious/image_uplaoder
	**There are no copyrights! Do whatever you want!**
*/
var iu = { //image uploader
    multiple: false,
    minSize: 5 * 1000,
    maxSize: 2 * 1000 * 1000,
    formats: ['image/jpeg'],
    target: 'ajax/upload.php',
    data: {},
    init: function(cxt,url){
		this.target=url;
        iu.button = cxt;
        var form = document.createElement('form');
        form.setAttribute('method', 'post');
        form.setAttribute('enctype', 'multipart/form-data');
        iu.input = document.createElement('input');
        iu.input.type = 'file';
        iu.input.name = 'img';
        iu.input.id = 'hiddenFileInput';
        if (iu.multiple)
            iu.input.setAttribute('multiple', 'true');
        
        form.appendChild(iu.input);
        iu.button.parentNode.appendChild(form);
        form.style.display = 'none';// if we hide the form, a bug appears in chrome.
        iu.button.addEventListener('click', iu.buttonClick, false);
    },
    handle: function(e) {
        if (e.preventDefault != undefined)
            e.preventDefault();
        if (!iu.multiple)
            iu.upload(0);
        else
            for (var i = 0; i < iu.input.files.length; i++)
                iu.upload(i);
    },
    
    upload: function(id){
        if (!iu.fileValidate(id))
            return false;
        var file = iu.input.files[id];
        var request = new XMLHttpRequest();
        request.open('POST', iu.target+'&name='+encodeURIComponent(file.name), true);
        iu.inProgress(file);
        request.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
        request.setRequestHeader('X-File-Name', 'ff');
        request.setRequestHeader('Content-Type', 'application/octet-stream');
        request.send(file);
        request.onreadystatechange = function() {
            if (request.readyState==4 &&(request.status == 200 || request.status == 304))
                iu.success(request.responseText);
            /*else
                iu.error(status.status);*/
        }
    },
    fileValidate: function(id){
        var file = iu.input.files[id];
        var size = file.size;
        if (size > iu.maxSize)
            iu.error('big size');
        else if (size < iu.minSize)
            iu.error('small size');
        else if (!file.type in iu.formats)
            iu.error('not image');
        return true;
    },
    buttonClick: function(){
		iu.warning();
        document.getElementById('hiddenFileInput').click();
        document.getElementById('hiddenFileInput').addEventListener('change', iu.handle, false);
    },
	warning:function(){},
    success: function(response) {},
    error: function(msg){
        alert('error:'+msg);
        return false;
    },
    inProgress: function(){},
};
