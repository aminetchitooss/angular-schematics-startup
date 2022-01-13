import { SchematicContext, Tree } from "@angular-devkit/schematics";
import { MsalSchematicOption } from ".";
import { updateFile } from "./update-file";

export function updateIndex(options: MsalSchematicOption) {
  const IE_HTML = `
  <div class="center column isIE"> <img src="assets/images/ie.png" alt="ie">
    <div class="text">
      <h2>Browser not supported</h2>
      <h3>Looks like you're using an ancient browser. Please use Chrome, Edge or Safari for a better experience</h3>
    </div>
  </div> `;
  const IE_HTML_wrapped = "`" + IE_HTML + "`";
  const Pending_HTML = `
  <div class="center h-100 w-100">
    <div class="loginForm">
      <div class="center">
        <div class="loginForm__logo">
          <div class="div-pending"></div>
        </div>
      </div>
      <div class="center column mb-12">
        <div class="text-pending min mb-2"></div>
        <div class="text-pending half"></div>
      </div>
      <div class="center">
        <div class="max-size">
          <div class="column al-start flex mb-12">
            <div class="text-pending min mb-2"></div>
            <div class="loginForm__mailDiv">
              <div class="div-pending mb-4"></div>
            </div>
          </div>
          <div class="loginForm__login mb-12">
            <div class="div-pending mb-4 rad"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
  `;
  const Pending_HTML_wrapped = "`" + Pending_HTML + "`";
  const updatedContent = `
<!doctype html>
<html lang="en">

<head>
  <meta charset="utf-8">
  <title>${options.projectName}</title>
  <base href="/">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <link rel="icon" type="image/x-icon" href="favicon.ico">
  <link rel="preconnect" href="https://fonts.gstatic.com">
  <link
    href="https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,300;0,400;0,500;0,700;1,300;1,400;1,700&display=swap"
    rel="stylesheet">
  <link rel="manifest" href="manifest.webmanifest">
  <meta name="theme-color" content="#1976d2">

  <meta name="description" content="${options.description}">
  <meta property="fb:app_id" content="795896254430016">
  <meta property="og:title" content="${options.projectName}">
  <meta property="og:site_name" content="${options.projectName}">
  <meta property="og:description" content="${options.description}">
  <meta property="og:image" content="https://${options.url}/assets/images/logo.png">
  <meta property="og:type" content="website" />

  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="${options.projectName}">
  <meta name="twitter:description" content="${options.description}">
  <meta name="twitter:image" content="https://${options.url}/assets/images/logo.png">

  <link rel="apple-touch-icon" href="assets/images/logo.png">

  <meta name="mobile-web-app-capable" content="yes">
  <meta name="apple-mobile-web-app-capable" content="yes">
</head>
  
<script>
  function setSkeleton() {
    const isIE = window.navigator.userAgent.indexOf('MSIE ') > -1 || window.navigator.userAgent.indexOf('Trident/') > -1;
    if (isIE) {  
      document.getElementById('splash').innerHTML =${IE_HTML_wrapped}
    } else if (localStorage['save'] !== "true") {
      document.getElementById('splash').innerHTML =${Pending_HTML_wrapped}
    }
    document.getElementById('splash').style.opacity = "1"
  }
</script>      
<body onload="setSkeleton()">
  <app-root></app-root>
  <div id="splash" class="splash">
    <div class="flex between desktop h-100 w-100">
      <div class="nav h-100">
        <div class="flex splash-profile w-100 between">
          <div class="icon-pending medium"></div>
          <div class="splash-profile-name flex column al-start">
            <div class="text-pending half mb-2"></div>
            <div class="text-pending full"></div>
          </div>
        </div>
        <div class="flex column">
          <div class="splash-link flex">
            <div class="icon-pending small"></div>
            <div class="text-pending full"></div>
          </div>
          <div class="splash-link flex">
            <div class="icon-pending small"></div>
            <div class="text-pending full"></div>
          </div>
          <div class="splash-link flex">
            <div class="icon-pending small"></div>
            <div class="text-pending full"></div>
          </div>
          <div class="splash-link flex">
            <div class="icon-pending small"></div>
            <div class="text-pending full"></div>
          </div>
        </div>
        <div class="splash-footer w-100">
          <div class="splash-link logout flex">
            <div class="icon-pending small"></div>
            <div class="text-pending half"></div>
          </div>
          <div class="splash-link sponsor center">
            <div class="text-pending half"></div>
            <div class="text-pending half"></div>
          </div>
          <div class="text-pending half"></div>
        </div>
      </div>
      <div class="splash__content flex column h-100 w-100">
        <div class="splash-header  flex w-100">
          <div class="icon-pending small"></div>
          <div class="text-pending title"></div>
        </div>
        <div class="splash-result flex column al-start h-100 w-100">
          <div class="text-pending title first-text mb-2"></div>
          <div class="text-pending half sub-text mb-4"></div>
        </div>
      </div>
    </div>
    <div class="center al-start mobile h-100 w-100">
      <div class="splash__content fullWidth">
        <div class="flex splash-profile w-100 between mb-4">
          <div class="icon-pending medium"></div>
          <div class="splash-profile-name flex column al-start">
            <div class="text-pending half mb-2"></div>
            <div class="text-pending full"></div>
          </div>
        </div>

        <div class="splash-header frame flex w-100 mb-4">
          <div class="icon-pending small"></div>
          <div class="flex column">
            <div class="text-pending title mb-2"></div>
            <div class="text-pending title"></div>
          </div>
        </div>
        <div class="splash-header frame flex w-100 mb-4">
          <div class="icon-pending small"></div>
          <div class="flex column">
            <div class="text-pending title mb-2"></div>
            <div class="text-pending title"></div>
          </div>
        </div>
        <div class="splash-header frame flex w-100 mb-4">
          <div class="icon-pending small"></div>
          <div class="flex column">
            <div class="text-pending title mb-2"></div>
            <div class="text-pending title"></div>
          </div>
        </div>
        <div class="splash-header frame flex w-100 mb-4">
          <div class="icon-pending small"></div>
          <div class="flex column">
            <div class="text-pending title mb-2"></div>
            <div class="text-pending title"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <app-redirect></app-redirect>
  <noscript>Please enable JavaScript to continue using this application.</noscript>
</body>

</html>  
  
  `;
  return (_host: Tree, _context: SchematicContext) => {
    return updateFile(_host, _context, "", updatedContent, options, options.srcDir + "index.html");
  };
}
