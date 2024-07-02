import { useState } from "react";
import {
  Button,
  Stack,
  Switch,
  Table,
  TableCell,
  TableRow,
  TableBody,
} from "@mui/material";

export const App = () => {
  const [isIgnored, setIsIgnored] = useState(false);
  const [isAlwaysOnTop, setIsAlwaysOnTop] = useState(false);
  return (
    <Stack
      display="flex"
      flexDirection="column"
      gap={2}
      alignItems="center"
      justifyContent="center"
      m={2}
    >
      <h1>Comment-Stream</h1>
      <Table size="small">
        <TableBody>
          <TableRow>
            <TableCell>クリックイベント無効化</TableCell>
            <TableCell>
              <Switch
                checked={isIgnored}
                onChange={() => {
                  (window as any).electronAPI.sendIgnoreMouseEvents(!isIgnored);
                  setIsIgnored((isIgnored) => !isIgnored);
                }}
              />
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>最前面に表示</TableCell>
            <TableCell>
              <Switch
                checked={isAlwaysOnTop}
                onChange={() => {
                  (window as any).electronAPI.sendAlwaysOnTop(!isAlwaysOnTop);
                  setIsAlwaysOnTop((isAlwaysOnTop) => !isAlwaysOnTop);
                }}
              />
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>背景色透明化</TableCell>
            <TableCell>
              <Switch
                checked={isAlwaysOnTop}
                onChange={() => {
                  (window as any).electronAPI.sendTransparent(!isAlwaysOnTop);
                  setIsAlwaysOnTop((isAlwaysOnTop) => !isAlwaysOnTop);
                }}
              />
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>コメントテスト</TableCell>
            <TableCell>
              <Button
                variant="outlined"
                onClick={() =>
                  (window as any).electronAPI.sendSampleMessage("hello")
                }
              >
                Send
              </Button>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
      <Button>ウインドウを閉じる</Button>
    </Stack>
  );
};
