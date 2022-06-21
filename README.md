## Get ready for uploading file
Git clone this project and run `npm run setup` to install all needed package on both front and back side.


## Ok, let's go on a back end upload
On this part, we will implement the back end code in order to upload a file.

1/ On the *router.js* file, just add a path on a `post` to a *UploadController.js* with an `upload()` method, that we will create just after. Direct the path to `/upload`;
2/ In this path, we will add a middleware wiht the *multer* package. For that, import the `multer` package and initialize it with 
``` const upload = multer({ dest: "./public/tmp/" });```
Then, add your middleware directly bteween your path and the call to the controller
``` upload.single("myfile") ```
3/ Create your controller from the item model and delete everything related to route in it. (Static method)
4/ Create a static method called `upload`. Once done, you can import the `fs` library;
5/ Inside the method, we will use the fs library to rename the file and move it to the */public/images* folder thaht you should create;
``` fs.rename(originalPath, newPath) ```
6/ And use its callback function with `err` params to send a message back to the client
  If err => upload error
  If not => msg: complete path to the file

Finale Code
```
fs.rename(
  req.file.path,
  `./public/images/${req.file.originalname}`,
  (err) => {
    if (err) {
      console.log(err);
      res.status(400).send("Error while uploading");
    } else {
      res.status(203).json({
        msg: "Upload success",
        url: `http://localhost:5000/public/images/${req.file.originalname}`,
      });
    }
  }
```

7/ You can now test it on Postman

## Front end part
Now, let's go on react !!!

1/ On the `App.jsx`, import the `react-hook-form` package and initialize it `useForm()`. And create in the return the form as below.
```
<form onSubmit={handleSubmit(onSubmit)}>
  <input {...register("file")} type="file" />
  <button type="submit">Submit</button>
</form>
```

2/ Create a submit fonction. This one will first create a `new FormData()` and store it in a `const`. It permit to construct key/value pari under the `"mulitpart/form-data"` encoding type (For upload);
3/ This new variable will `append` the `data[0].file` on a *"myfile"* key.
4/ Then use a `fetch`call to your back end url. As param Object add { method: 'POST' && body: <<Your variable>> };
5/ Just do a traditional `.then()  .catch()`

Your code should look like
```
const formData = new FormData();
formData.append("myfile", data.file[0]);

fetch("http://localhost:5000/upload", {
  method: "POST",
  body: formData,
})
  .then((res) => res.json())
  .catch((err) => console.log(err));
```

>>> If all is correctly set, your file should be upload to the back end..

## Now, display the image.
If you try to get the image, you see an error...
We can't access it now...

On the back end part
1/ On the *index.js* file, we will add directly a route just under the `app.listen(port, (err) => {...`. This one will transfert the file if your route begin with a `public` path.
```
app.get("/public/:folder/:file", (req, res) => {
  res.sendFile(`${__dirname}/public/${req.params.folder}/${req.params.file}`);
});
```

Test it, if your write your file url on a browser, you should get it

On the front end
2/ In your `App.jsx` file, create a state for an imageurl.
3/ On the `.then()` of your `fetch()` after jsondecoding, set the image url.
4/ Display it in the `return` statement under your form.