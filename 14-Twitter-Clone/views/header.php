<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <link rel="stylesheet" 
    href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css" integrity="sha384-MCw98/SFnGE8fJT3GXwEOngsV7Zt27NXFoaoApmYm81iuXoPkFOJwJ8ERdknLPMO" 
    crossorigin="anonymous">
  <link href="https://fonts.googleapis.com/css?family=BioRhyme|Cabin" rel="stylesheet">
  <link rel="stylesheet" href="/css/styles.css">
  <title>Twinger</title>
</head>
<body>
  <nav class="navbar navbar-expand-lg navbar-dark bg-primary">
    <a class="navbar-brand" href="http://localhost/">Twinger</a>
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>

    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav mr-auto">
        <li class="nav-item" id="timeline">
          <a class="nav-link" href="?page=timeline">Twingeline</a>
        </li>
        <li class="nav-item" id="personal">
          <a class="nav-link" href="?page=personal">Your Twinges</a>
        </li>

        <li class="nav-item" id="profiles">
          <a class="nav-link" href="?page=profiles">Public Profiles</a>
        </li>
      </ul>
      <div class="form-inline my-2 my-lg-0">
        <?php if ($_SESSION['id']): ?>
          <a href="/actions.php?action=logout" class="btn btn-outline-light my-2 my-sm-0">Logout</a>
        <?php else: ?>
          <button 
            class="btn btn-outline-light my-2 my-sm-0" 
            data-target="#login-modal" 
            data-toggle="modal"
          >
            Log in / Sign up
          </button>
        <?php endif ?>
      </div>
    </div>
  </nav>
