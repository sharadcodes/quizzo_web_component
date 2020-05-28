const template = document.createElement("template");
template.innerHTML = `
<link href="https://sharadcodes.github.io/quizzo_web_component/src/quizzo_styles.css" rel="stylesheet" type="text/css">  
<div class="quizzo">
    <div class="meta">
        <h1 class="name"></h1>
    </div>
    <p class="question"></p>
    <div class="options" id="answers"></div>
    <div class="notify"></div>
    <button class="submit">SUBMIT</button>
    <input class="next_que" hidden>
</div>
`;

class QuizzoWebComp extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.shadowRoot.appendChild(template.content.cloneNode(true));
  }

  connectedCallback() {
    this.shadowRoot.querySelector(".name").innerText = this.getAttribute("name");
    this.counter = 0;

    fetch(this.getAttribute("json-file"))
      .then((res) => res.json())
      .then((questions) => {
        // question
        const que_div = this.shadowRoot.querySelector(".question")
        que_div.innerText =`Q1: ` + questions[0].que;
        const total_ques = questions.length;
        var ques_counter = 0;
        // generating html for answers
        const answers_count = questions[0].opt.length;
        var answers_html = ``;
        questions[ques_counter].opt.map((ans, index) => {
          answers_html += `<label><input type="radio" name="answer" value="${index + 1}" group="answers">${ans}</label>`;
        });
        this.shadowRoot.querySelector(".options").innerHTML = answers_html;
        // button events
        this.shadowRoot.querySelector("button").addEventListener("click", (e) => {

            const answer_element = this.shadowRoot.querySelector("input[name=answer]:checked");

            if (answer_element.value == questions[ques_counter].ans) {
              this.shadowRoot.querySelector(".notify").innerText = "Correct Answer :)";
              this.shadowRoot.querySelector(".notify").style.backgroundColor = "#46a049";
              this.shadowRoot.querySelector(".notify").style.color = "#fff";
              
              if(ques_counter<total_ques-1){
                ques_counter++;
                que_div.innerText =`Q${ques_counter+1}: ` + questions[ques_counter+1==1?2:ques_counter].que;
                answers_html = "";
                questions[ques_counter].opt.map((ans, index) => {
                  answers_html += `<label><input type="radio" name="answer" value="${index + 1}" group="answers">${ans}</label>`;
                });
                this.shadowRoot.querySelector(".options").innerHTML = answers_html;
              }
            } else {
              this.shadowRoot.querySelector(".notify").innerText = "Wrong Answer, Try Again :(";
              this.shadowRoot.querySelector(".notify").style.backgroundColor = "#f35b5b";
              this.shadowRoot.querySelector(".notify").style.color = "#fff";
            }

            setTimeout(() => { 
              this.shadowRoot.querySelector(".notify").style = null;
              this.shadowRoot.querySelector(".notify").innerHTML = null;
            }, 1000);

          });


      });
  }
  disconnectedCallback() {
    this.shadowRoot.querySelector("button").removeEventListener();
  }
}
window.customElements.define("quizzo-web-comp", QuizzoWebComp);
