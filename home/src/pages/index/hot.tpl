<ul class="hot-list product-list clearfix">
    {{#products}}
    <li class="product-item col-1 col-gap">
        <a href="./detail.html?productId={{_id}}">
            <img class="product-img lazyload" data-src="{{mainImage}}" src="https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=1026602819,2905318318&fm=26&gp=0.jpg" alt="{{name}}" />
            <p class="product-name">{{name}}</p>
            <p class="product-price-paynums">
                <span class="product-price">{{price}}</span>
                <span class="paynums">{{payNums}}人已购买</span>
            </p>
        </a>
    </li>
    {{/products}}
</ul>