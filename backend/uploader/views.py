from .serializers import PostSerializer
from .models import Post
from rest_framework.views import APIView
from rest_framework.parsers import MultiPartParser, FormParser  # These are for file upload, not for json, xml, etc. So, we need to use them in the view to parse the request data which contains the file.
from rest_framework.response import Response
from rest_framework import status

# Create your views here.

class PostView(APIView):
    parser_classes = (MultiPartParser, FormParser)

    def get(self, request):
        posts = Post.objects.all()
        serializer = PostSerializer(posts, many=True)
        # Build absolute url for the image
        for post in serializer.data:
            post['image'] = request.build_absolute_uri(post['image'])
        return Response(serializer.data)

    def post(self, request):
        posts_serializer = PostSerializer(data=request.data)
        if posts_serializer.is_valid():
            posts_serializer.save()
            print('success', posts_serializer.data)
            return Response(status=status.HTTP_201_CREATED)
        else:
            print('error', posts_serializer.errors)
            return Response(posts_serializer.errors, status=status.HTTP_400_BAD_REQUEST)