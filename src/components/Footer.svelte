<footer>
    <span>&copy; Simon Barth, 2022</span>
    <a href="https://github.com/Data5tream/monolog-web-viewer" target="_blank" rel="noreferrer">Github</a>
    <span>Licensed under GNU AGPLv3</span>
</footer>

<style lang="scss">
  footer {
    color: #ccc;
    background: #111;
    padding: 12px 16px;

    & > * {
      padding: 0 8px;
      border-right: 1px solid #ccc;

      &:first-child {
        padding-left: 0;
      }

      &:last-child {
        border-right: 0;
      }
    }
  }

  a, a:visited {
    color: #ccc;
  }
</style>