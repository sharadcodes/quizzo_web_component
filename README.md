# Quizzo Web Component
An Open Source web component for your quizzes.
> Developer: [Sharad Raj](https://github.com/sharadcodes/)

## [Live Demo](https://sharadcodes.github.io/quizzo_web_component/example/)

## USAGE

The `json` file should be in the following format. For example file check [ques.json](https://sharadcodes.github.io/quizzo_web_component/example/ques.json)

```json
[
    {
        "que": "Which among the following is not an operating system ?",
        "opt": [
            "Linux",
            "MacOS",
            "Windows",
            "Android"
        ],
        "ans": 2
    },
    {
        "que": "Is Windows good",
        "opt": [
            "Yes",
            "No"
        ],
        "ans": 2
    }
]    
```

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Quizzo Web Component Example</title>

    <!-- Include the script -->
    <script src="https://sharadcodes.github.io/quizzo_web_component/src/quizzo_web_component.js" async></script>
    
  </head>
  <body>
    
    <!-- add the tag with all attributes -->
    <quizzo-web-comp
      json-file="./ques.json" 
      name="This is a demo quiz"
    />
    
  </body>
</html>
```
