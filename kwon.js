var num = 0;  //스케줄의 개수


function newschedule(){     //새로운 스케줄을 추가하는 함수
	var newevent = $('<div contenteditable>');       //스케줄 박스를 만들어 주는 수정가능한 div태그 생성
	var xImage = $('<img>'); //X표시 생성을 위한 이미지 태그 생성
	//x표시와 스케줄 박스의 속성과 css설정을 추가
	xImage.attr('src', 'x.png').attr('id','delete'+num).css('display', 'none').css('width', '10px').css('height', '10px').css('position', 'absolute').attr('onclick', 'remove(event)').css('cursor', 'pointer').css('margin-left', '90px');
	newevent.css('border', '1px solid black').css('padding', '2px').css('background-color', 'yellow').css('width', '100px').css('margin', '10px');
	newevent.attr('id', 'new'+num).attr('draggable', 'true').attr('ondragstart', 'drag(event)').attr('onmouseover', 'over('+num+')').attr('onmouseout', 'out('+num+')').attr('onblur', 'changeText(event)');
	var text = '스케줄 추가'   //스케줄 박스를 생성했을 때 미리 들어가 있을 텍스트
	newevent.append(xImage);     //x표시와 텍스트를 스케줄 박스에 추가
	newevent.append(text);
	$('#head').append(newevent);   //스케줄 박스를 id가 head인 부분에 추가
	num++;     //스케줄의 개수를 나타내는 num을 1증가

}

function drag(ev){    //안에 있는 내용을 드래그 할 수 있게 하는 함수
	ev.dataTransfer.setData("text", ev.target.id);
}

function allowDrop(ev){   //드롭을 허용하는 함수
	event.preventDefault();
}

function drop(ev){   //드롭을 했을 때 실행 되는 함수
	ev.preventDefault();
	var data = ev.dataTransfer.getData("text");  //data는 생성된 스케줄박스의 id값
	var value ="";   //localStorage에 value값으로 넣을 값을 생성 후 초기화

	if(localStorage.getItem(ev.target.id)!=null){   //localStorage가 비어 있지 않는 경우
		ev.target.appendChild(document.getElementById(data)); //달력에 일정을 추가
		var value = localStorage.getItem(ev.target.id);   //해당 날짜의 localStorage값을 불러옴
		value += document.getElementById(data).outerHTML;  //해당 날짜의 추가된 스케줄을 포함한 전체 스케줄을 value값에 저장
	}
	else{   //localStorage가 비어있는 경우
		ev.target.appendChild(document.getElementById(data)); //달력에 일정을 추가
		value += document.getElementById(data).parentNode.innerHTML;  //해당 날짜의 스케줄을 value값에 저장
	}
	localStorage.setItem(ev.target.id, value);    //추가된 스케줄을 포함한 전체 value값을 locaStorage에 해당 날짜의 id값을 key로 해서 저장
}


function over(index){  //mouseover시 x이미지 보이게 하는 메소드
	$('#delete'+index).show();  //x표시를 보이게 함
}

function out(index){  //mouseout시 x이미지 없어지게 하는 메소드
	$('#delete'+index).hide();	//x표시를 숨기게 함
}
function remove(event){   //일정을 삭제하는 메소드
	var value = event.target.parentNode.parentNode.id;  //x표시가 속해 있는 해당 날짜의 id값을 value값으로 설정
	event.target.parentNode.remove();  //x표시가 속해 있는 스케줄을 삭제
	localStorage.setItem(value, document.getElementById(value).innerHTML);  //해당 날짜의 id값을 key로 하고 value값을 해당 날짜의 전체 스케줄로 하여 localStorage에 저장
}

function load(){     //저장된 일정을 로드하는 메소드
	for(var i=1; i<=31; i++){   //날짜 전체를 반복
		if(localStorage.getItem(i)!=null){   //localStorage의 값이 null이 아닐 경우
			document.getElementById(i).innerHTML = localStorage.getItem(i);  //해당 날짜 인덱스의 localStorage값을 해당 날짜에 추가
		}
	}
}
function changeText(event){   //텍스트의 내용이 수정 되었을 때 다시 저장하는 함수
	event.target.lastChild.data = $('#'+event.target.id).text();  //해당 스케줄의 text값을 해당 스케줄 박스 마지막 자식의 data값으로 설정
	var value = event.target.parentNode.id;  //해당 스케줄 박스가 속해 있는 날짜의 id값을 value값으로 설정
	localStorage.setItem(value, document.getElementById(value).innerHTML); //해당 날짜에 대해 그에 해당하는 전체 스케줄들을 localStorage에 저장
}

function reset(){   //localStorage를 초기화 해주는 함수
	localStorage.clear();
}

