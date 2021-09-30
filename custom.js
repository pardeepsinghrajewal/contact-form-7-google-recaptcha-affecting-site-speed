var captchaLoaded = false;
var yourSiteKey = "";
function recaptchaCustomScript()
{
  /** copied from wpcf7-recaptcha js file **/
  var t;
  wpcf7_recaptcha = {"sitekey":yourSiteKey,"actions":{"homepage":"homepage","contactform":"contactform"}};
  const n = wpcf7_recaptcha.sitekey, 
  {homepage: c, contactform: o} = wpcf7_recaptcha.actions, 
  r = e=>{
        const {action: t, func: c, params: o} = e;
        grecaptcha.execute(n, {
            action: t
        }).then(e=>{
            const n = new CustomEvent("wpcf7grecaptchaexecuted",{
                detail: {
                    action: t,
                    token: e
                }
            });
            document.dispatchEvent(n)
        }
        ).then(()=>{
            "function" == typeof c && c(...o)
        }
        ).catch(e=>console.error(e))
    };
  if(grecaptcha.ready(()=>
  {
        r({
            action: c
        })
  }),
  document.addEventListener("change", e=>{
        r({
            action: o
        })
    }),
  "undefined" != typeof wpcf7 && "function" == typeof wpcf7.submit) {
        const e = wpcf7.submit;
        wpcf7.submit = (t,n={})=>{
            r({
                action: o,
                func: e,
                params: [t, n]
            })
        }
    }
  document.addEventListener("wpcf7grecaptchaexecuted", e=>{
        const t = document.querySelectorAll('form.wpcf7-form input[name="_wpcf7_recaptcha_response"]');
        for (let n = 0; n < t.length; n++)
            t[n].setAttribute("value", e.detail.token)
    }
  );
  captchaLoaded = true;
}
window.addEventListener('load', function () 
{
  jQuery('.wpcf7-form input').on('focus', function() 
  {
    if(!captchaLoaded)
    {
      let head = document.getElementsByTagName('head')[0];
      let script = document.createElement('script');
      script.type = 'text/javascript';
      script.onload = function() 
      {
        recaptchaCustomScript();
      }
      script.src = "https://www.google.com/recaptcha/api.js?render="+yourSiteKey;
      head.appendChild(script);
    }
  });
})