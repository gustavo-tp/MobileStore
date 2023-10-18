import { render } from "@testing-library/react-native";

import Cart from "@/app/cart";

describe("<Produts />", () => {
  it("has 1 child", () => {
    const tree = render(<Cart />).toJSON();
    expect(tree.children.length).toBe(1);
  });
});
