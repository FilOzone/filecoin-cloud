'use client'

import { Icon } from '@filecoin-foundation/ui-filecoin/Icon'
import { desktopStyle } from '@filecoin-foundation/ui-filecoin/Navigation/NavigationMainLink'
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { CaretDownIcon, CheckIcon, GlobeIcon } from '@phosphor-icons/react'
import { clsx } from 'clsx'
import { useChainId, useSwitchChain } from 'wagmi'
import { filecoinCalibration, mainnet } from 'wagmi/chains'

const networks = [
  { chain: mainnet, label: 'Mainnet' },
  { chain: filecoinCalibration, label: 'Calibration Testnet' },
]

export function NavigationNetworkToggle() {
  const chainId = useChainId()
  const { switchChain } = useSwitchChain()

  const selectedNetwork =
    networks.find((n) => n.chain.id === chainId) ?? networks[1]

  return (
    <Menu as="div" className="relative">
      <MenuButton
        className={clsx(
          desktopStyle,
          'cursor-pointer inline-flex items-center gap-2',
        )}
      >
        <Icon component={GlobeIcon} size={20} />
        {selectedNetwork.label}
        <Icon component={CaretDownIcon} size={20} />
      </MenuButton>

      <MenuItems
        transition
        className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md border shadow-lg transition data-closed:scale-95 data-closed:transform data-closed:opacity-0 data-enter:duration-100 data-enter:ease-out data-leave:duration-75 data-leave:ease-in"
      >
        <div className="py-1">
          {networks.map((network) => (
            <MenuItem key={network.chain.id}>
              <button
                type="button"
                onClick={() => switchChain({ chainId: network.chain.id })}
                className={clsx(
                  desktopStyle,
                  'cursor-pointer inline-flex items-center gap-2',
                )}
              >
                {network.label}
                {chainId === network.chain.id && (
                  <Icon component={CheckIcon} size={20} />
                )}
              </button>
            </MenuItem>
          ))}
        </div>
      </MenuItems>
    </Menu>
  )
}
