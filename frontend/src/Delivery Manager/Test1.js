import React, {useState,useContext} from 'react'


export default function Test1() {
    const [showText, setShowText] = useState(false);


    const [isLoading, setLoading] = useState(false);

    const onClick = () => setShowText(true);
    const onClick2 = () => setShowText(false);


    const handleClick = () => {
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
        }, 1000);
    }

    return (
        <div className="content">
            <h1>Home</h1>
            <button onClick={onClick}>Click me</button>
            <button onClick={onClick2}>Click me2</button>
            {showText ? <Text /> : null}
            

            <button
                variant="primary"
                disabled={isLoading}
                onClick={!isLoading ? handleClick : null}
            >  <i class="fa fa-trash"></i>
                {isLoading ? 'Loading…' : 'Click to load'}
            </button>









            <form class="was-validated">
  <div class="mb-3">
    <label for="validationTextarea" class="form-label">Textarea</label>
    <input class="form-control is-invalid" id="validationTextarea" placeholder="Required example textarea" required/>
    <div class="invalid-feedback" hidden>
      Please enter a message in the textarea.
    </div>
  </div>

  <div class="form-check mb-3">
    <input type="checkbox" class="form-check-input" id="validationFormCheck1" required/>
    <label class="form-check-label" for="validationFormCheck1">Check this checkbox</label>
    <div class="invalid-feedback">Example invalid feedback text</div>
  </div>

  <div class="form-check">
    <input type="radio" class="form-check-input" id="validationFormCheck2" name="radio-stacked" required/>
    <label class="form-check-label" for="validationFormCheck2">Toggle this radio</label>
  </div>
  <div class="form-check mb-3">
    <input type="radio" class="form-check-input" id="validationFormCheck3" name="radio-stacked" required/>
    <label class="form-check-label" for="validationFormCheck3">Or toggle this other radio</label>
    <div class="invalid-feedback">More example invalid feedback text</div>
  </div>

  <div class="mb-3">
    <select class="form-select" required aria-label="select example">
      <option value="">Open this select menu</option>
      <option value="1">One</option>
      <option value="2">Two</option>
      <option value="3">Three</option>
    </select>
    <div class="invalid-feedback">Example invalid select feedback</div>
  </div>


  <div class="mb-3">
    <button class="btn btn-primary" type="submit" disabled>Submit form</button>
  </div>
</form>
















        </div>
    )
}

const Text = () => <div>You clicked the button!</div>;
