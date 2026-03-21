import { Metadata } from '@redwoodjs/web'
import {
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
} from '@carbon/react'
import GridGeneratorPanel from 'src/components/panels/GridGeneratorPanel/GridGeneratorPanel'
import SpacingExplorerPanel from 'src/components/panels/SpacingExplorerPanel/SpacingExplorerPanel'
import ComponentAnatomyPanel from 'src/components/panels/ComponentAnatomyPanel/ComponentAnatomyPanel'
import TypographyScalePanel from 'src/components/panels/TypographyScalePanel/TypographyScalePanel'
import TokenCalculator from 'src/components/TokenCalculator/TokenCalculator'
import ExportPanel from 'src/components/ExportPanel/ExportPanel'

const HomePage = () => {
  return (
    <>
      <Metadata title="φ Grid — Golden Ratio CSS Playground" />
      <Tabs>
        <TabList aria-label="Playground panels" contained>
          <Tab>Grid Generator</Tab>
          <Tab>Spacing Explorer</Tab>
          <Tab>Component Anatomy</Tab>
          <Tab>Typography Scale</Tab>
          <Tab>Token Calculator</Tab>
          <Tab>Export</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <GridGeneratorPanel />
          </TabPanel>
          <TabPanel>
            <SpacingExplorerPanel />
          </TabPanel>
          <TabPanel>
            <ComponentAnatomyPanel />
          </TabPanel>
          <TabPanel>
            <TypographyScalePanel />
          </TabPanel>
          <TabPanel>
            <TokenCalculator />
          </TabPanel>
          <TabPanel>
            <ExportPanel />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </>
  )
}

export default HomePage
