<style>
    .album {
        /*width: {{width}}px;*/
        /*height: {{height}}px;*/
        column-count: {{inRow}};
        -webkit-column-count: {{inRow}};
        -moz-column-count: {{inRow}};
        -moz-column-gap: 0px;
        column-gap: 7px;
    }

    .album img {
        border-radius: {{corners}}px;
        width: 100% !important;
        height: auto !important;
    }

    .album-card {
        display: inline-block;
        margin-bottom: 10px;
        border: 1px solid lightgrey;
        border-radius: {{corners}}px;
    }

</style>

<div class="album">
    <div class="album-card" data-ng-repeat="item in album.albumItems">
        <img class="card-img-top" src="{{item.src}}" alt="image cap">
        <div class="card-body p-2">
            <h5 class="card-title">{{item.title}}</h5>
            <p class="card-text">{{classGr}} - {{item.description}}</p>
        </div>
    </div>
</div>

<!--
<div class="card-deck">
    <div class="row">
        <div class="card m-1" data-ng-repeat="item in album.albumItems">
            <img class="card-img-top" src="{{item.src}}" alt="Card image cap">
            <div class="card-body">
                <h5 class="card-title">{{item.title}}</h5>
                <p class="card-text">{{classGr}} - {{item.description}}</p>
            </div>
            <div class="card-footer">
                <small class="text-muted">{{item.footer}}</small>
            </div>
        </div>
    </div>
</div>
</div>
-->