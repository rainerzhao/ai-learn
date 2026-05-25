/**
 * rehype plugin: remove the first <h1> from rendered Markdown content.
 * The article layout already renders a title H1, so the Markdown H1 is redundant.
 */
export default function rehypeRemoveFirstH1() {
  return (tree: any) => {
    let removed = false;
    tree.children = tree.children.filter((node: any) => {
      if (!removed && node.tagName === 'h1') {
        removed = true;
        return false;
      }
      return true;
    });
  };
}
