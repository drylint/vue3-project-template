declare interface IApiHomeData {
  readonly arealist: Record<string, unknown>[],
  readonly bannerlist: Record<string, unknown>[],
  readonly categorylist: Record<string, unknown>[],
  readonly nav_image: string,
  readonly recommendlist: Record<string, unknown>[],
  readonly selectarea: '-1' | '0',
}
