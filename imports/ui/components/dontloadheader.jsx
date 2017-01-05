export const HeaderComponent = () => (
<nav id="mainNav" class="navbar-default navbar-default navbar-fixed-top">
  <div class="container">
    {/* Brand and toggle get grouped for better mobile display */}
    <div class="navbar-header">
      <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1">
        <span class="sr-only">Toggle navigation</span>
        <span class="icon-bar"></span>
        <span class="icon-bar"></span>
        <span class="icon-bar"></span>
      </button>
      <a href="/"><img src="/res/img/cleanr-logo.png" class="navbar-brand-logo"/></a>
    </div>

    {/* Collect the nav links, forms, and other content for toggling */}
    <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
      <ul class="nav navbar-nav">
        {{#if currentUser}}
          {{#with getuserdata}}
            {{#if user_name}}
              <li id="accountcp"><a href="{{pathFor 'account'}}">Welcome, {{user_name}}</a></li>
            {{else}}
              <li><a href="{{pathFor 'account'}}">Welcome, {{currentUser.emails.[0].address}}</a></li>
            {{/if}}
            {{else}}
            <li><a href="/registration/step2">Welcome - Please complete info</a></li>
          {{/with}}
        {{/if}}
        {{> NavbarUserControl}}
        {/* <li class="divider-vertical"></li> */}
        {{#if isInRole 'vendor'}}
          <li id="vendormenu" class="dropdown">
            <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">Vendor Actions<span class="caret"></span></a>
            <ul class="dropdown-menu">
              <li id="vendorcp"><a href="/vendorcp">Control Panel</a></li>
              <li id="vendorws"><a href="/vendorworkschedule">Schedule</a></li>
              <li id="vendorsf"><a href="/vendorspecify">Specify Slots</a></li>
              <li id="vendorcl"><a href="/vendorcustomers">Customers</a></li>
              <li role="separator" class="divider"></li>
              <li id="vendorsds"><a href="/vendorregistration">Set Default Schedule</a></li>
            </ul>
          </li>
        {{/if}}
      </ul>
      <ul class="nav navbar-nav navbar-right">
        {{#if currentUser}}
        <li id="notificationdd" class="dropdown">
          <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false"><i class="fa fa-lg {{#if atleastonenotification}}fa-bell cleanr-icon-green-darker{{else}}fa-bell-o{{/if}}"></i></a>
          <ul class="dropdown-menu notification-area">
            {{#each notificationfound}}
              {{#if notificationIsType0 this}}
                <li class="ntf"><span><a href="/vendorsessiondetails/{{this.sid}}">New assigned session: {{#with sessbysessid this.sid}} {{dateToDay date}} {{dateFormat date}} {{/with}} </a><i id="{{_id}}" class="fa fa-close dismissn"></i></span></li>
              {{else}}
                {{#if notificationIsType1 this}}
                  <li class="ntf text-center"><span><a href="/customersessiondetails/{{this.sid}}">Completed Session: {{#with sessbysessid this.sid}} {{dateToDay date}} {{dateFormat date}} {{/with}} </a><i id="{{_id}}" class="fa fa-close dismissn"></i></span></li>
                {{else}}
                  {{#if notificationIsType2 this}}
                    <li class="ntf"><span><a href="/vendorsessiondetails/{{this.sid}}">Session not yet marked completed: {{#with sessbysessid this.sid}} {{dateToDay date}} {{dateFormat date}} {{getslotbynum timeslot}} {{/with}} </a><i id="{{_id}}" class="fa fa-close dismissn"></i></span></li>

                  {{else}}
                    {{#if notificationIsType3 this}}
                      <li class="ntf"><span><a href="/vendorsessiondetails/{{this.sid}}">Session completed: {{#with sessbysessid this.sid}} {{dateToDay date}} {{dateFormat date}} {{getslotbynum timeslot}} {{/with}} </a><i id="{{_id}}" class="fa fa-close dismissn"></i></span></li>
                    {{else}}
                      <li class="ntf"><span><a href="/vendorsessiondetails/{{this.sid}}">Unknown notification</a><i id="{{_id}}" class="fa fa-close dismissn"></i></span></li>
                    {{/if}}
                  {{/if}}
                {{/if}}
              {{/if}}
              {{else}}
                      <li class="ntf text-center">No new notifications</li>
            {{/each}}
            <li class="text-center">
              {{#if atleastonenotification}}
                <div>
                <a class="btn btn-sm btn-success" href="/notifications/">View all</a>
                <button class="btn btn-sm btn-success dismissnall">
                  Dismiss all
                </button>
                </div>
              {{else}}
                <a class="ntf" href="/notifications/">View all</a>
              {{/if}}
            </li>
          </ul>
        </li>
        {{/if}}
        <li>
          <p class="navbar-btn-fix">
            <button id="demobtn" class='btn btn-lg btn-info'>Demo</button>
          </p>
        </li>
        <li>
          <p class="navbar-btn-fix">
            <a href='/schedule' id="booknowbtn" class='btn btn-lg btn-success'>Book Now</a>
          </p>
        </li>
      </ul>
    </div>{/* /.navbar-collapse */}
  </div>{/* /.container-fluid */}
</nav>
<script>
$('#mainNav').affix({
  offset: {
    top: 100
  }
})
</script>
        );

