
$(document).ready(function(){
  
  $("#myModal").on("hidden.bs.modal",function(){
    $("#iframeYoutube").attr("src","#");
  })

  //Youtube
  var search = $("#searchInput").val().trim();

  $("#searchBtn").on("click", function(e) {
     e.preventDefault();
	  $("#carouselExampleControls").html("");
     $("#content").html("");
	 $(".heading").html('You Search for ' + search);
	  
     // prepare the request
  $.get(
        "https://www.googleapis.com/youtube/v3/search",
        {
          part: 'snippet',
          maxResults: 20,
          q: encodeURIComponent(search).replace(/%20/g, "+"),
          type: "video",
          key: 'AIzaSyDjJ91GrZcPwRmylis58nAyzl-CIngxJQc',
         },
      function(data){
          var output ='';
          $.each(data.items, function(i, item){  
          videoId =  item.id.videoId;
          image = item.snippet.thumbnails.medium.url;
          title = item.snippet.title;
          channelTitle = item.snippet.channelTitle;
          console.log(image);
          
          var linkimage ='<a href="#" onclick="changeVideo(\''+  videoId  +'\')"><img style="width:100%;" src=\"'+ image+'\"></a>';

            // VIDEO

          output = '<div class="col-lg-4 col-md-4"><div class="card text-white bg-primary mb-3" style="display: flex"><div class="card-header">'+ channelTitle +'</div><div class="card-body"><h4 class="card-title">'+ title +'</h4>'+ linkimage +'</div></div></div> ';


          $('#content').append(output);
        });
     }); 
  }); 
})

function changeVideo(vId){
  var iframe=document.getElementById("iframeYoutube");
  iframe.src="https://www.youtube.com/embed/"+vId;

  $("#myModal").modal("show");
}
