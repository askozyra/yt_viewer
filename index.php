<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>YouTube Viewer</title>
    <link rel="shortcut icon" href="src/img/favicon.ico" type="image/x-icon">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Josefin+Sans:wght@100&display=swap" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css2?family=Josefin+Sans:wght@500&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="styles/style.css">
</head>
<body>
    <header class="header">
        <?php include "elems/header.php"; ?>
    </header>    

    <main class="main">
        <div class="video" id="player">
            no video
        </div>
        <div class="queue_wrapper">
            <ul class="queue_list">
            </ul>
        </div>
    </main>

    <footer class="footer">
        <?php include "elems/footer.php"; ?>
    </footer>
    <script src="https://www.youtube.com/iframe_api"></script>
    <script src="scripts/script.js" type="module"></script>
</body>
</html>